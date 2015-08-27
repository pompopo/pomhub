
export const TAB_SELECTED = 'TAB_SELECTED';

export function selectTab(index) {
  return {
    type: TAB_SELECTED,
    index: index
  }
}
