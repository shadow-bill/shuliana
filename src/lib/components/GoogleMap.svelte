<script>
  import { onMount } from 'svelte';

  // Props
  export let apiKey = 'AIzaSyAg-JnddkifD5VUJMcc6_gyIPlYY88aLL0';
  export let center = { lat: 53.4734624, lng: -2.2413626 };
  export let zoom = 16;
  export let width = '100%';
  export let height = '400px';
  export let mapStyles = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#ff709d"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#130e22"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#130e22"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#130e22"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#130e22"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#130e22"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#156465"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#156465"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#156465"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#156465"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#156465"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#156465"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#156465"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#156465"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#2b3638"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2b3638"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#24282b"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#24282b"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]; // Custom map styles array
  export let markers = [
    { lat: 53.473635, lng: -2.241423, title: 'Brickhouse Social'}
  ]; // Array of marker objects: { lat, lng, title?, icon? }
  export let disableDefaultUI = false;
  export let gestureHandling = 'auto';
  export let mapTypeId = 'roadmap'; // roadmap, satellite, hybrid, terrain

  // Map instance and container
  let mapContainer;
  let map;
  let google;
  let markersOnMap = [];

  // Load Google Maps API
  async function loadGoogleMaps() {
    if (window.google && window.google.maps) {
      google = window.google;
      return;
    }

    return new Promise((resolve, reject) => {
      if (!apiKey) {
        reject(new Error('Google Maps API key is required'));
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        google = window.google;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };
      
      document.head.appendChild(script);
    });
  }

  // Initialize the map
  function initMap() {
    if (!google || !mapContainer) return;

    const mapOptions = {
      center,
      zoom,
      styles: mapStyles,
      disableDefaultUI,
      gestureHandling,
      mapTypeId
    };

    map = new google.maps.Map(mapContainer, mapOptions);
    
    // Add markers if provided
    addMarkers();
  }

  // Add markers to the map
  function addMarkers() {
    if (!map || !google) return;

    // Clear existing markers
    markersOnMap.forEach(marker => marker.setMap(null));
    markersOnMap = [];

    // Add new markers
    markers.forEach(markerData => {
      const marker = new google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map,
        title: markerData.title || '',
        icon: markerData.icon || null
      });

      // Add click event if title is provided
      if (markerData.title) {
        const infoWindow = new google.maps.InfoWindow({
          content: markerData.title
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }

      markersOnMap.push(marker);
    });
  }

  // Update map when props change
  $: if (map && google) {
    map.setCenter(center);
    map.setZoom(zoom);
    map.setOptions({ 
      styles: mapStyles,
      disableDefaultUI,
      gestureHandling,
      mapTypeId
    });
  }

  $: if (map && markers) {
    addMarkers();
  }

  // Initialize on mount
  onMount(async () => {
    try {
      await loadGoogleMaps();
      initMap();
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  });

  // Export methods for parent component access
  export function getMap() {
    return map;
  }

  export function setCenter(newCenter) {
    center = newCenter;
    if (map) map.setCenter(center);
  }

  export function setZoom(newZoom) {
    zoom = newZoom;
    if (map) map.setZoom(zoom);
  }

  export function addMarker(markerData) {
    markers = [...markers, markerData];
  }

  export function clearMarkers() {
    markers = [];
  }
</script>

<div 
  bind:this={mapContainer}
  class="google-map"
  style="width: {width}; height: {height};"
>
  {#if !apiKey}
    <div class="error-message">
      <p>Google Maps API key is required</p>
    </div>
  {/if}
</div>

<style>
  .google-map {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .error-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #f5f5f5;
    color: #666;
    font-family: Arial, sans-serif;
  }

  .error-message p {
    margin: 0;
    padding: 20px;
    text-align: center;
  }
</style>