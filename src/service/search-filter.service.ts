import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {
  constructor() { }

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

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      value = value[k];

      if (!value) {
        return false;
      }

      // If the value is an array and we have more keys to process
      if (Array.isArray(value) && i < keys.length - 1) {
        const remainingKeys = keys.slice(i + 1).join('.');
        // Search through each item in the array
        return value.some((item: any) =>
          this.searchInNestedObject(item, remainingKeys, searchText)
        );
      }

      // If the value is an array at the last key, check each item
      if (Array.isArray(value) && i === keys.length - 1) {
        return value.some((item: any) =>
          item?.toString().toLowerCase().includes(searchText)
        );
      }
    }

    return value.toString().toLowerCase().includes(searchText);
  }
}
