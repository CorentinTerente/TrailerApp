import TrailersListScreen from './TrailersListScreen';
import DetailsTrailersScreen from './DetailsTrailersScreen';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
    {
      Trailers: TrailersListScreen,
      Trailer: DetailsTrailersScreen,
    },
    {
      initialRouteName: "Trailers"
    }
  );

export const AppContainer= createAppContainer(AppNavigator);