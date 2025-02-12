import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {
  constructor() {}

  /**
   * Filters data based on the search text and config object
   * @param data The data to be searched through
   * @param config Config object containing keys for filtering
   * @param searchText The search string to match
   * @returns Filtered data array
   */
  searchData(
    data: any[],
    config: { keys: string[] },
    searchText: string
  ): any[] {
    const lowercasedSearchText = searchText.toLowerCase();

    return data.filter((item) => {
      return config.keys.some((key) => {
        if (key.includes('.')) {
          // Handle nested properties (e.g., 'outletList.outletName')
          return this.searchInNestedObject(item, key, lowercasedSearchText);
        } else {
          return item[key]
            ?.toString()
            .toLowerCase()
            .includes(lowercasedSearchText);
        }
      });
    });
  }

  /**
   * Handles searching in nested objects
   * @param obj The object to search within
   * @param key The key (including nested keys) to search for
   * @param searchText The search string
   * @returns True if a match is found
   */
  private searchInNestedObject(
    obj: any,
    key: string,
    searchText: string
  ): boolean {
    const keys = key.split('.');
    let value = obj;

    for (const k of keys) {
      value = value[k];
      if (!value) {
        return false;
      }
    }

    return value.toString().toLowerCase().includes(searchText);
  }
}
