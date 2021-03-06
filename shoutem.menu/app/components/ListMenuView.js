import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import {
  ImageBackground,
  Subtitle,
  Overlay,
  Title,
  Divider,
  TouchableOpacity,
  Tile,
} from '@shoutem/ui';

export default class ListMenuView extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    item: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.item);
  }

  render() {
    const { item } = this.props;
    const price = item.price ? (
      <Overlay>
        <Subtitle styleName="sm-gutter-horizontal">{item.price}</Subtitle>
      </Overlay>) : null;

    return (
      <TouchableOpacity key={item.id} onPress={this.onPress}>
        <ImageBackground
          styleName="large-banner placeholder"
          source={{ uri: item.image ? item.image.url : undefined }}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{item.name.toUpperCase()}</Title>
            {price}
          </Tile>
        </ImageBackground>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}
