import { Button, Form, Input, Popconfirm, Select, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from 'flux/hooks';
import { rosterAddCharacter, rosterReset } from 'flux/roster/reducer';
import { getWCLCharacter } from 'flux/wcl/action';
import { selectWCLRegion } from 'flux/wcl/selector';
import { REALM_LIST } from 'game/realmList';
import { logEvent } from 'services/amplitude/analytics';
import { rosterCharacterToKey } from 'utils/key';

export default function RosterForm() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const region = useAppSelector(selectWCLRegion);

  const onFinish = (values: any) => {
    let name: string = values.name;
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const serverSlug: string = values.serverSlug;

    logEvent('home', 'roster-add', { name, serverSlug, region });

    dispatch(
      rosterAddCharacter({
        name,
        serverSlug,
        serverRegion: region,
      }),
    );
    dispatch(
      getWCLCharacter({
        key: rosterCharacterToKey({ name, serverSlug, serverRegion: region }),
        name,
        serverSlug,
        serverRegion: region,
      }),
    );
    form.setFieldValue('name', '');
  };

  const onClickResetRoster = () => {
    logEvent('home', 'roster-reset');
    dispatch(rosterReset());
  };

  return (
    <div className="flex items-center justify-between">
      <Form form={form} name="rosterForm" layout="inline" onFinish={onFinish}>
        <Form.Item
          name={'name'}
          rules={[{ required: true, message: 'Pseudo is required' }]}
        >
          <Input style={{ width: 150 }} placeholder="Pseudo" />
        </Form.Item>
        <Form.Item
          name={'serverSlug'}
          noStyle
          rules={[{ required: true, message: 'Realm is required' }]}
        >
          <Select
            showSearch
            style={{ width: 150 }}
            options={REALM_LIST[region].map((realm) => ({
              value: realm.slug,
              label: realm.name,
            }))}
            placeholder="Realm"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>
        <div className="ml-[16px]">
          <Button type="primary" htmlType="submit">
            Add Player
          </Button>
        </div>
      </Form>
      <Tooltip
        title="That will reset your current roster."
        placement="bottomLeft"
      >
        <Popconfirm
          title="Reset roster"
          description="Are you sure?"
          onConfirm={onClickResetRoster}
          okText="Yes"
          cancelText="No"
          placement="left"
        >
          <Button danger size="small">
            Reset roster
          </Button>
        </Popconfirm>
      </Tooltip>
    </div>
  );
}
