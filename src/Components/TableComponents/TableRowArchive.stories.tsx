import type {Meta, StoryObj} from '@storybook/react';
import {Provider} from 'react-redux';
import { store } from '../../store/configStore';
import TableRowArchive, {TableRowArchiveProps} from "./TableRowArchive";


const meta: Meta<TableRowArchiveProps> = {
  title: 'Tables/TableRowArchive',
  component: TableRowArchive,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof TableRowArchive>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: TableRowArchiveProps) => (
  <Provider store={store}>
    <table className="w-full mx-auto mb-5">
      <TableRowArchive {...args} />
    </table>
  </Provider>
);
export const Primary: Story = {
  argTypes: {
    tableShowFor: {
      control: 'radio',
      options: ['unarchived', 'archived'],
      description: 'Expect unarchived or archived',
    },
  } ,
  args: {
    note: {
      id: 'any',
      title: 'New feature',
      category: 'Idea',
      content: 'Implement new feature for app before 18/07/2023',
      created: 'July 15, 2023',
      dates: '18/07/2023',
      archived: false,
    },
    tableShowFor: 'unarchived',

    setEditedNoteId: () => {},
  },
  render: Template,
};
