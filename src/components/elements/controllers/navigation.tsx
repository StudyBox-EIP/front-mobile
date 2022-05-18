export function resetPageHistory(navigation: any, defaultPage: string) {
  navigation.reset({
    index: 0,
    routes: [{name: defaultPage}],
  });
}
