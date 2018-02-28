<template>
    <gmap-map :center="center" :zoom="9" style="width: 800px; height: 600px; margin: 0 auto">
        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
            {{infoContent.title}}
            <img :src="infoContent.img" class="image is-128x128">
        </gmap-info-window>

        <gmap-cluster><gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker></gmap-cluster>
    </gmap-map>
</template>

<script>
export default {
  props: {
    restos: Array
  },
  data() {
    return {
      center: { lat: 48.8258504, lng: 2.3531853 },
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: []
    };
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        //if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  },
  created() {
    this.restos.forEach(resto => {
      this.markers.push({
        position: { lat: resto.address.lat, lng: resto.address.lng },
        infoText: {
          title: resto.name,
          img: resto.photo
        }
      });
    });
  }
};
</script>
