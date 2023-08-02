import type {Meta, StoryObj} from '@storybook/react';
import {Provider} from 'react-redux';
import { store } from '../../store/configStore';
import TableRowArchive, {TableRowArchiveProps} from "./TableRowArchive";

const meta = {
  title: 'Tables/TableRowArchive',
  component: TableRowArchive,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TableRowArchive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = (args: TableRowArchiveProps) => (
  <Provider store={store}>
    <TableRowArchive {...args} />
</Provider>
);

Primary.args = {
  note: {
    id: 'any',
    title: 'string',
    category: 'string',
    content: 'string',
    created: 'string',
    dates: 'string',
    archived: true
  },
  tableShowFor: 'unarchived',
  setEditedNoteId: () => {},
};

