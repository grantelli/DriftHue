declare namespace google.maps.places {
    interface Autocomplete {
      addListener(eventName: string, handler: () => void): void;
      getPlace(): google.maps.places.PlaceResult;
    }
    
    interface AutocompleteOptions {
      types?: string[];
    }
  
    interface PlaceResult {
      formatted_address?: string;
    }
  }
  
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: google.maps.places.AutocompleteOptions
          ) => google.maps.places.Autocomplete;
        };
      };
    };
  }