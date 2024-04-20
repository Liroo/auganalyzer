import { useAppDispatch, useAppSelector } from '@/flux/hooks';
import { selectPlanTimeRangesByKey } from '@/flux/plan/selector';
import { selectRosterListEnhanced } from '@/flux/roster/selector';
import {
  getWCLCharactersWithEncounterRankings,
  getWCLReports,
} from '@/flux/wcl/action';
import { WCLCharacter } from '@/wcl/wcl';

export default function useAugAnalyzer() {
  const dispatch = useAppDispatch();
  const rosterListEnhanced = useAppSelector(selectRosterListEnhanced);
  const timeRanges = useAppSelector(selectPlanTimeRangesByKey());

  const analyzeByEncounterId = async (encounterID: number) => {
    const charactersWithEncounterRankings = await dispatch(
      getWCLCharactersWithEncounterRankings({
        encounterID,
        characters: rosterListEnhanced,
      }),
    ).unwrap();

    const reportsToAnalyze: Array<{
      code: string;
      startTime: number;
      endTime: number;
      players: Array<{
        name: string;
        serverSlug: string;
        serverRegion: string;
      }>;
    }> = charactersWithEncounterRankings.reduce((acc: any, c: WCLCharacter) => {
      const rank = c?.encounterRankings?.[encounterID]?.ranks?.[0];

      if (!rank) return acc;

      const existingRank = acc.find((r: any) => r.code === rank.report.code);
      if (existingRank) {
        existingRank.players.push({
          name: c.name,
          serverSlug: c.serverSlug,
          serverRegion: c.serverRegion,
        });
        return acc;
      }

      acc.push({
        code: rank.report.code,
        startTime: rank.startTime - rank.report.startTime,
        endTime: rank.startTime - rank.report.startTime + rank.duration,
        players: [
          {
            name: c.name,
            serverSlug: c.serverSlug,
            serverRegion: c.serverRegion,
          },
        ],
      });
      return acc;
    }, []);

    const reportsQuery = reportsToAnalyze.map((r) => {
      return {
        code: r.code,
        timeRanges: timeRanges
          .map((tr) => ({
            startTime: r.startTime + tr[0],
            endTime: r.startTime + tr[1],
          }))
          .filter((tr) => tr.startTime < r.endTime),
      };
    });

    dispatch(getWCLReports({ reportsQuery }));
  };

  return { analyzeByEncounterId };
}
