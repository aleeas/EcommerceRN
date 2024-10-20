export interface SearchBarProps {
  searchInput: string;
  setSearchInput: (text: string) => void;
  handleSearch: () => void;
  cartItemCount: number;
  navigation: any;
}
