import React from 'react';
import Flexbox from '../Flexbox';
import Icon from './index';

export default {
  title: 'Components/Icon',
  component: Icon,
};

export const Story1 = (args) => <Icon {...args} />;
Story1.storyName = 'Basic usage';
Story1.args = {
  icon: 'users'
}
Story1.argTypes = {
  className: { control: { disable: true } },
}


export const Story2 = (args) => {
  const allIcons = [
    'users',
    'up',
    'twitter',
    'settings',
    'search',
    'sass',
    'rocket',
    'refresh',
    'react',
    'pie-chart',
    'page',
    'map-marker',
    'list',
    'linkedin',
    'layers',
    'javascript',
    'instagram',
    'html5',
    'heart',
    'hamburger',
    'github',
    'fullscreen-exit',
    'fullscreen',
    'forward',
    'facebook',
    'dots',
    'discussion-bubble',
    'discussion',
    'demo',
    'css3',
    'coffee',
    'code-color',
    'code-bubble',
    'code',
    'close',
    'chevron-up',
    'chevron-right',
    'chevron-left',
    'chevron-down',
    'check',
    'burger',
    'bar-chart',
    'arrow-right',
    'arrow-left',
    'apps',
    'add',
    'home3',
    'price-tag',
    'price-tags',
    'location',
    'location2',
    'clock',
    'clock2',
    'bell',
    'printer',
    'floppy-disk',
    'bubble',
    'user-tie',
    'spinner6',
    'spinner7',
    'spinner8',
    'spinner11',
    'search1',
    'zoom-in',
    'zoom-out',
    'lock',
    'unlocked',
    'equalizer',
    'equalizer2',
    'cog',
    'cogs',
    'bug',
    'fire',
    'bin',
    'bin2',
    'list1',
    'menu',
    'earth',
    'eye',
    'eye-blocked',
    'star-empty',
    'star-half',
    'star-full',
    'heart1',
    'checkbox-checked',
    'checkbox-unchecked',
    'embed',
    'embed2',
    'terminal',
    'share2',
    'google2',
    'google-plus2',
    'google-plus3',
    'facebook1',
    'facebook2',
    'instagram1',
    'twitter1',
    'youtube',
    'youtube2',
    'github1',
    'tux',
    'appleinc',
    'finder',
    'windows8',
    'linkedin1',
    'linkedin2',
  ];
  return (
  <Flexbox flexWrap="wrap">
    {allIcons.map(icon => (
      <Flexbox style={{ margin: '15px'}} justifyContent="center" alignItems="center" direction="column">
        <Icon fontSize={30} icon={icon} key={icon} />{icon}
      </Flexbox>
    ))}
  </Flexbox>);
}
Story2.storyName = 'Available icons';
Story2.args = {
}
Story2.argTypes = {
  className: { control: { disable: true } },
  icon: { control: { disable: true } },
}
