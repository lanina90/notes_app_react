import type {Meta, StoryObj} from '@storybook/react';
import Button, {ButtonType} from "./Button";


const meta: Meta<ButtonType> = {
  title: 'UIKit/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ButtonType) => (
  <Button {...args} />
);
export const Primary: Story = {
  argTypes: {
    type: {
      control: 'radio',
      options: ['button', 'submit'],
    },
  } ,
  args: {
    className: 'w-3/6 mx-auto my-4 p-2.5h-9 cursor-pointer p-1 border-2 border-dark-grey hover:bg-dark-grey',
    type: 'button',
    label: 'Create New',
    onClick: () => {}
  },
  render: Template,
};