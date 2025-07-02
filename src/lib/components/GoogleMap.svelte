<script>
  import { onMount, onDestroy } from 'svelte';

  // Props
  export let apiKey = 'AIzaSyAg-JnddkifD5VUJMcc6_gyIPlYY88aLL0';
  export let centerLat = 53.4734624;
  export let centerLng = -2.2413626;
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
  let observer;
  let isVisible = false;
  let mapInitialized = false;

  // Load Google Maps API
  async function loadGoogleMaps() {
    if (window.google && window.google.maps) {
      google = window.google;
      return;
    }

    return new Promise((resolve, reject) => {
      google = window.google;
      resolve();
    });
  }

  // Initialize the map
  async function initMap() {
    if (!google || !mapContainer || mapInitialized) return;

    const mapOptions = {
      center: { lat: centerLat, lng: centerLng },
      zoom,
      styles: mapStyles,
      disableDefaultUI,
      gestureHandling,
      mapTypeId
    };

    map = new google.maps.Map(mapContainer, mapOptions);
    mapInitialized = true;
    
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

  // Set up intersection observer
  function setupObserver() {
    if (!mapContainer) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !mapInitialized) {
            isVisible = true;
            
            try {
              await loadGoogleMaps();
              await initMap();
            } catch (error) {
              console.error('Error loading Google Maps:', error);
            }
            
            // Stop observing once map is initialized
            observer.unobserve(mapContainer);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '50px' // Start loading 50px before element comes into view
      }
    );

    observer.observe(mapContainer);
  }

  // Update map when props change (only if map is already initialized)
  $: if (map && google && mapInitialized) {
    map.setCenter({ lat: centerLat, lng: centerLng });
    map.setZoom(zoom);
    map.setOptions({ 
      styles: mapStyles,
      disableDefaultUI,
      gestureHandling,
      mapTypeId
    });
  }

  $: if (map && markers && mapInitialized) {
    addMarkers();
  }

  // Initialize on mount
  onMount(() => {
    setupObserver();
  });

  // Clean up on destroy
  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  // Export methods for parent component access
  export function getMap() {
    return map;
  }

  export function setCenter(newCenter) {
    centerLat = newCenter.lat;
    centerLng = newCenter.lng;
    if (map) map.setCenter(newCenter);
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

  // Force initialize map (useful if you need to load it programmatically)
  export async function forceInit() {
    if (!mapInitialized) {
      try {
        await loadGoogleMaps();
        await initMap();
      } catch (error) {
        console.error('Error force-loading Google Maps:', error);
      }
    }
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
  {:else if !mapInitialized}
    <div class="loading-message">
      <p>Loading map...</p>
    </div>
  {/if}
</div>

<style>
  .google-map {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .error-message,
  .loading-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #222222;
    color: #666;
    font-family: Arial, sans-serif;
  }

  .error-message p,
  .loading-message p {
    margin: 0;
    padding: 20px;
    text-align: center;
  }

  .loading-message {
    background-color: #222222;
  }
</style>