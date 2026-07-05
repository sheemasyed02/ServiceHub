import { CommonActions } from '@react-navigation/native';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';

function getRootNavigation(navigation: NavigationProp<ParamListBase>) {
  let current: NavigationProp<ParamListBase> | undefined = navigation;

  while (current?.getParent()) {
    current = current.getParent();
  }

  return current;
}

export function navigateToMain(navigation: NavigationProp<ParamListBase>) {
  getRootNavigation(navigation)?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    }),
  );
}

export function navigateToAuth(navigation: NavigationProp<ParamListBase>) {
  getRootNavigation(navigation)?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    }),
  );
}
