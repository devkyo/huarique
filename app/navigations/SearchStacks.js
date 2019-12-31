import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from '../screens/Search'
import SearchDetailScreen from '../screens/Search'

const SearchScreenStacks = createStackNavigator({
   Search: {
      screen: SearchScreen,
      navigationOptions: () => ({
         title: 'Busca tu restaurante' 
      })
   }
})

export default SearchScreenStacks