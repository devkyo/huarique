import React from 'react'
import { Icon } from 'react-native-elements'

import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'


// importando navegaciones 
import RestaurantsScreenStacks from './RestaurantsStacks'
import TopListsScreenStacks from './TopListsStacks' 
import SearchScreenStacks, { SearchDetailScreen } from './SearchStacks' 
import AccountScreenStacks from './AccountStacks' 

//creando botones de navegacion
const NavigationStacks = createBottomTabNavigator({

   Restaurants: {
      screen: RestaurantsScreenStacks,
      navigationOptions: () => ({
         tabBarLabel: 'Restaurantes',
         tabBarIcon: ({ tintColor }) => (
            <Icon
               type="material-community"
               name="star-outline"
               size={22}
               color={tintColor}
            />
         )
      })
   },
   TopLists: {
      screen: TopListsScreenStacks,
      navigationOptions: () => ({
         tabBarLabel: 'Top',
         tabBarIcon: ({ tintColor }) => (
            <Icon
               type="material-community"
               name="compass-outline"
               size={22}
               color={tintColor}
            />
         )
      })
   },
   Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
         tabBarLabel: 'Buscar',
         tabBarIcon: ({ tintColor }) => (
            <Icon
               type="material-community"
               name="magnify"
               size={22}
               color={tintColor}
            />
         )
      })
   },
   Account: {
      screen: AccountScreenStacks,
      navigationOptions: () => ({
         tabBarLabel: 'Cuenta',
         tabBarIcon: ({ tintColor }) => (
            <Icon
               type="material-community"
               name="account"
               size={22}
               color={tintColor}
            />
         )
      })
   }
},
{
   initialRouteName: 'Account',
   order: ['Restaurants','TopLists','Search','Account'],
   tabBarOptions: {
      inactiveTintColor: '#646464',
      activeTintColor: '#00a680'
   }
}
)

// exportar CreateAppContainer pasandole la navegacion 
export default createAppContainer(NavigationStacks)