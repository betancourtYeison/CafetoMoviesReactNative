/** Import modules **/
import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Icon } from 'react-native-elements'

/** Import Constants **/
import StringsConstants from './../../constants/strings/strings'
import StringsMoviesScreen from './strings'
import styles from './style'

/** Import actions **/
import { setMoviesAction, setSelectedYearAction, setRatingAction } from '../../actions/movies'

/** Import components **/
import Loader from '../../components/loader/Loader'
import YearPicker from '../../components/yearPicker/YearPicker'
import SliderImages from '../../components/sliderImages/SliderImages'

/** Import Api functions **/
import { apiGet } from '../../api'

/** CONSTS **/
const APIKEY = '7ca802c71a7661f4403fcfd0a3a1a059'
const URLMOVIEDB = 'https://api.themoviedb.org/3'

/**
 * Class to export movies
 *
 * @class MoviesScreen
 * @extends {React.Component}
 */
class MoviesScreen extends React.Component {
  /**
   * Creates an instance of MoviesScreen.
   * @param {*} props
   * @memberof MoviesScreen
   */
  constructor(props) {
    super(props)
    this.state = {
      selectedYear: this.props.movies && this.props.movies.selectedYear ? this.props.movies.selectedYear : null,
    }
  }

  /**
   * Default options to navigation
   *
   * @static
   * @memberof MoviesScreen
   */
  static navigationOptions = {
    header: null,
    title: StringsConstants.nameApp,
    headerBackTitle: StringsConstants.back,
  }

  /**
   * Function to get all posts
   *
   * @memberof MoviesScreen
   */
  _getMovies = () => {
    this.loader.openLoader(async () => {
      let { selectedYear } = this.state
      let data = null
      if (!this.props.movies[selectedYear]) {
        data = await apiGet(
          `${URLMOVIEDB}/discover/movie?primary_release_year=${selectedYear}&sort_by=release_date.asc&api_key=${APIKEY}&language=es`
        )()
        this.props.setMoviesAction({ ...data, selectedYear })
        this.loader.closeLoader(() => this.sliderImages._move(0))
      } else {
        this.props.setSelectedYearAction(selectedYear)
        this.loader.closeLoader(() => this.sliderImages._move(0))
      }
    })
  }

  /**
   * Function to update state by on change
   *
   * @memberof MoviesScreen
   */
  _onChangeText = (key, value) => {
    this.setState({ [key]: value }, () => {
      this._getMovies()
    })
  }

  /**
   * function to open picker
   *
   * @memberof MoviesScreen
   */
  _showPicker = () => {
    let { selectedYear } = this.state
    this.yearPicker.openYearPicker(selectedYear, value => this._onChangeText('selectedYear', value))
  }

  /**
   * Function to get all posts
   *
   * @memberof MoviesScreen
   */
  _setRating = (movie, rating) => {
    if(this.props.movies && this.props.movies.selectedYear){
      this.props.setRatingAction(movie, rating)
    }
  }

  /**
   * Render pre sign in view
   *
   * @returns
   * @memberof MoviesScreen
   */
  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <Loader onRef={ref => (this.loader = ref)} />
        <YearPicker onRef={ref => (this.yearPicker = ref)} />
        <TouchableOpacity style={styles.yearPickerButton} onPress={this._showPicker}>
          <Text style={styles.textPicker}>
            {this.state.selectedYear ? this.state.selectedYear : StringsMoviesScreen.chooseYear}
          </Text>
          <View style={styles.iconStyle}>
            <Icon name="caret-down" type="font-awesome" />
          </View>
        </TouchableOpacity>
        <View style={styles.containerSlider}>
          <SliderImages
            onRef={ref => (this.sliderImages = ref)}
            horizontal={true}
            dataSource={this.props.movies[this.props.movies.selectedYear]}
            titleStyle={styles.titleStyle}
            setRating={this._setRating}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = { setMoviesAction, setSelectedYearAction, setRatingAction }

const mapStateToProps = state => ({
  movies: state.movies,
})

/** Export component MoviesScreen **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesScreen)
