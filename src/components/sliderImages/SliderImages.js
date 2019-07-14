import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Platform, Image, Text, View, PanResponder, TouchableOpacity, Dimensions } from 'react-native'
import NestedScrollView from 'react-native-nested-scroll-view'

import Separator from '../separator/Separator'
import Colors from '../../constants/styles/colors'
import styles from './style'

const NO_IMAGE = Platform.OS === 'ios' ? { uri: `noimage` } : { uri: `@mipmap/noimage` }

/**
 * Export SliderImages
 *
 * @export
 * @class SliderImages
 * @extends {Component}
 */
export default class SliderImages extends Component {
  /**
   *Creates an instance of SliderImages.
   * @param {*} props
   * @memberof SliderImages
   */
  constructor(props) {
    super(props)
    this.lastOffset = 0
    this.state = {
      position: 0,
      height: Dimensions.get('window').width * (4 / 9),
      width: Dimensions.get('window').width,
      scrolling: false,
      rate: [1, 2, 3, 4, 5],
    }
  }

  /**
   *
   *
   * @param {*} ref
   * @memberof SliderImages
   */
  _onRef(ref) {
    this._ref = ref
    if (ref && this.state.position !== this._getPosition()) {
      this._move(this._getPosition())
    }
  }

  /**
   *
   *
   * @param {*} index
   * @memberof SliderImages
   */
  _move(index) {
    const isUpdating = index !== this._getPosition()
    const height = this.props.height || this.state.height
    const width = this.state.width * index
    if (this.props.horizontal) {
      this._ref.scrollTo({ x: width, y: 0, animated: true })
    } else {
      this._ref.scrollTo({ x: 0, y: height * index, animated: true })
    }
    this.setState({ position: index })
    if (isUpdating && this.props.onPositionChanged) {
      this.props.onPositionChanged(index)
    }
  }

  /**
   *
   *
   * @returns
   * @memberof SliderImages
   */
  _getPosition() {
    if (typeof this.props.position === 'number') {
      return this.props.position
    }
    return this.state.position
  }

  /**
   *
   *
   * @memberof SliderImages
   */
  _next() {
    const positionState = this.state.position
    const pos = positionState === this.props.dataSource.length - 1 ? 0 : positionState + 1
    this._move(pos)
    this.setState({ position: pos })
  }

  /**
   *
   *
   * @memberof SliderImages
   */
  _prev() {
    const positionState = this.state.position
    const pos = positionState === 0 ? this.props.dataSource.length - 1 : positionState - 1
    this._move(pos)
    this.setState({ position: pos })
  }

  /**
   *
   *
   * @param {*} event
   * @memberof SliderImages
   */
  _onScrollEndDrag(event) {
    const currentPosition = this._getPosition()
    let currentOffset = null
    let heightWidth
    if (this.props.horizontal) {
      heightWidth = this.state.width
      currentOffset = event.nativeEvent.contentOffset.x
    } else {
      heightWidth = this.props.height || this.state.height
      currentOffset = event.nativeEvent.contentOffset.y
    }
    const down = currentOffset > this.lastOffset
    let positionEndDrag = heightWidth * currentPosition
    if (down) {
      this.lastOffset += heightWidth
      positionEndDrag += 50
    } else {
      this.lastOffset -= heightWidth
      positionEndDrag -= 50
    }
    if (down && currentOffset >= positionEndDrag) {
      this._next()
    } else if (down && currentOffset < positionEndDrag) {
      this._move(currentPosition)
    } else if (!down && currentOffset <= positionEndDrag) {
      this._prev()
    } else {
      this._move(currentPosition)
    }
  }

  /**
   *
   *
   * @param {*} prevProps
   * @memberof SliderImages
   */
  componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position) {
      this._move(this.props.position)
    }
  }

  /**
   *
   *
   * @memberof SliderImages
   */
  componentWillMount() {
    this.props.onRef(this)
    let release = (e, gestureState) => {
      const heightWidth = this.props.horizontal ? this.state.width : this.state.height
      const relativeDistance = (this.props.horizontal ? gestureState.dx : gestureState.dy) / heightWidth
      const v = this.props.horizontal ? gestureState.vx : gestureState.vy
      let change = 0

      if (relativeDistance < -0.5 || (relativeDistance < 0 && v <= 0.5)) {
        change = 1
      } else if (relativeDistance > 0.5 || (relativeDistance > 0 && v >= 0.5)) {
        change = -1
      }
      const position = this._getPosition()
      if (position === 0 && change === -1) {
        change = 0
      } else if (position + change >= this.props.dataSource.length) {
        change = this.props.dataSource.length - (position + change)
      }
      this._move(position + change)
      return true
    }

    this._panResponder = PanResponder.create({
      onPanResponderRelease: release,
    })

    this._interval = setInterval(() => {
      const newWidth = Dimensions.get('window').width
      if (newWidth !== this.state.width) {
        this.setState({ width: newWidth })
      }
    }, 16)
  }

  /**
   *
   *
   * @memberof SliderImages
   */
  componentWillUnmount() {
    this.props.onRef(undefined)
    clearInterval(this._interval)
  }

  /**
   *
   *
   * @returns
   * @memberof SliderImages
   */
  render() {
    const width = this.state.width
    const rate = this.state.rate
    return (
      <View style={[this.props.containerStyle, { flex: 1, width: width }]}>
        {/* SECTION IMAGE */}
        <NestedScrollView
          ref={ref => this._onRef(ref)}
          decelerationRate={0.99}
          horizontal={this.props.horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={this.props.scrollEnabled}
          onScrollEndDrag={this._onScrollEndDrag.bind(this)}
          {...this._panResponder.panHandlers}
          style={[styles.container, { flex: 1, width: width, flexDirection: this.props.horizontal ? 'row' : 'column' }]}
          bounces={false}
        >
          {this.props.dataSource &&
            this.props.dataSource.map((movie, index) => {
              const imageObject =
                typeof movie.poster_path === 'string'
                  ? { uri: `http://image.tmdb.org/t/p/w300${movie.poster_path}` }
                  : NO_IMAGE
              const textComponent = (
                <View style={styles.layoutText}>
                  {movie.title === undefined ? null : (
                    <Text style={this.props.titleStyle}>{movie.title.toUpperCase()}</Text>
                  )}
                </View>
              )
              const imageComponent = (
                <View key={index} style={{ flex: 1, width: width, alignItems: 'center' }}>
                  <Image source={imageObject} style={{ height: 300, width: 200 }} resizeMode="cover" />
                  {textComponent}
                  <Separator style={styles.separator} />
                  <Text style={this.props.titleStyle}>{`PROVIDE YOUR RANK`}</Text>
                  {/* SECTION INDICATOR */}
                  <View
                    style={[this.props.horizontal ? styles.layoutIndicatorHorizontal : styles.layoutIndicatorVertical]}
                  >
                    {rate.map((rate, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => this.props.setRating(movie, rate)}
                          style={[
                            [
                              styles.indicator,
                              setIndicatorSize(this.props.indicatorSize),
                              setIndicatorColor(this.props.indicatorColor),
                            ],
                            index < movie.rating && [
                              styles.indicatorSelected,
                              setIndicatorColor(this.props.indicatorSelectedColor),
                            ],
                          ]}
                        >
                          <View />
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                  {/* END SECTION INDICATOR */}
                </View>
              )
              return imageComponent
            })}
        </NestedScrollView>
        {/* END SECTION IMAGE */}
        {/* SECTION ARROW LEFT */}
        {this.props.showArrows ? (
          <View style={[layoutArrow(this.props.height, this.props.arrowSize), { left: 10, height: 50 }]}>
            <TouchableOpacity onPress={() => this._prev()}>
              {this.props.arrowRight === undefined ? (
                <View style={[iconArrow(this.props.arrowSize), iconArrowLeft(this.props.arrowSize)]} />
              ) : (
                this.props.arrowLeft
              )}
            </TouchableOpacity>
          </View>
        ) : null}
        {/* END SECTION ARROW LEFT */}
        {/* SECTION ARROW RIGHT */}
        {this.props.showArrows ? (
          <View style={[layoutArrow(this.props.height, this.props.arrowSize), { right: 10, height: 50 }]}>
            <TouchableOpacity onPress={() => this._next()}>
              {this.props.arrowRight === undefined ? (
                <View style={[iconArrow(this.props.arrowSize), iconArrowRight(this.props.arrowSize)]} />
              ) : (
                this.props.arrowRight
              )}
            </TouchableOpacity>
          </View>
        ) : null}
        {/* END SECTION ARROW RIGHT */}
      </View>
    )
  }
}

SliderImages.defaultProps = {
  dataSource: [{ poster_path: NO_IMAGE, title: 'MOVIE NAME', rating: 0 }],
  height: Dimensions.get('window').height - 140,
  indicatorSize: 40,
  indicatorColor: Colors.blackOpacity70,
  indicatorSelectedColor: Colors.greenBlue,
  scrollEnabled: true,
  arrowSize: 40,
  horizontal: false,
  showArrows: true,
}

SliderImages.propTypes = {
  indicatorSize: PropTypes.number,
  indicatorColor: PropTypes.string,
  indicatorSelectedColor: PropTypes.string,
  height: PropTypes.number,
  position: PropTypes.number,
  scrollEnabled: PropTypes.bool,
  containerStyle: PropTypes.object,
  overlay: PropTypes.bool,
  arrowSize: PropTypes.number,
  arrowLeft: PropTypes.object,
  arrowRight: PropTypes.object,
  onPress: PropTypes.func,
  onPositionChanged: PropTypes.func,
  horizontal: PropTypes.bool,
  showArrows: PropTypes.bool,
}

const setIndicatorSize = function(size) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  }
}

const setIndicatorColor = function(color) {
  return {
    backgroundColor: color,
  }
}

const layoutArrow = function(imageHeight, iconHeight) {
  return {
    position: 'absolute',
    backgroundColor: Colors.transparent,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    top: (imageHeight - iconHeight) / 4,
    bottom: imageHeight - iconHeight,
  }
}

const iconArrow = function(iconHeight) {
  return {
    width: 0,
    height: 0,
    margin: 5,
    backgroundColor: Colors.transparent,
    borderStyle: 'solid',
    borderTopColor: Colors.transparent,
    borderBottomColor: Colors.transparent,
    borderTopWidth: iconHeight / 2,
    borderBottomWidth: iconHeight / 2,
  }
}

const iconArrowRight = function(iconHeight) {
  return {
    borderRightWidth: 0,
    borderLeftWidth: (iconHeight * 75) / 100,
    borderRightColor: Colors.transparent,
    borderLeftColor: Colors.black,
  }
}

const iconArrowLeft = function(iconHeight) {
  return {
    borderRightWidth: (iconHeight * 75) / 100,
    borderLeftWidth: 0,
    borderRightColor: Colors.black,
    borderLeftColor: Colors.transparent,
  }
}
