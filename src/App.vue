<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="col-6 col-sm-4 col-md-2 mx-auto text-center">
      <img class="img-fluid"
           src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/250px-International_Pok%C3%A9mon_logo.svg.png"
           alt="">
    </div>
    <div class="col-10 col-md-6 mx-auto mb-5">
      <div class="card p-3 col-6 mx-auto">
        <input type="text" v-model="poke" @keyup.enter.prevent="llamarApiPokemon(poke)"
               class="form-control"
               placeholder="...buscar Pokemón"/>
        <button class="btn btn-primary btn-sm"
                @click.prevent="llamarApiPokemon(poke)">
          <span v-show="!loading">
            <i class="fas fa-search"></i>
          </span>
          <div v-show="loading" class="text-center">
            <b-spinner variant="warning" label="Loading..."></b-spinner>
          </div>
        </button>
      </div>

      <div v-show="loading" class="text-center  py-5">
        <b-spinner type="grow" variant="warning" label="Loading..."></b-spinner>
      </div>

      <div v-show="!loading" class="card p-3">

        <h3 :class="pokemon['existe'] ? 'text-uppercase fw-bold':'text-uppercase fw-bold text-danger mt-5'">
          {{ pokemon['nombre'] }}
        </h3>


        <img v-if="pokemon['imagen']!= null"
             id="imgPoke" :src="pokemon['imagen']" alt=""
             class="img-fluid card-img-top mx-auto" width="auto" height="auto">
        <img v-else id="imgPoke2" src="https://cdn-icons-png.flaticon.com/512/25/25400.png"
             alt=""
             class="img-fluid card-img-top mx-auto" width="auto" height="auto">
        <br>

<!--        <h5 v-if="pokemon['nombre'] !== 'POKEMON NO EXISTE'" class="text-center fw-bold">Habilidades</h5>-->
        <h5 v-show="pokemon['existe']" class="text-center fw-bold">Habilidades</h5>
        <div class="row justify-content-center">
          <div class="card col-3 d-flex h6 my-auto mb-1"
               v-for="(hab, index) in pokemon['habilidades']">{{ hab }}
          </div>
        </div>

        <br>
        <h5 v-show="pokemon['existe']" class="text-center fw-bold">Movimientos</h5>
        <div class="row justify-content-center">
          <div class="card col-3 d-flex h6 my-auto mb-1"
               v-for="(movi, index) in pokemon['movimientos']">{{ movi }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld
    },
    data() {
      return {
        pokemon: {
          'nombre': '',
          'habilidades': [],
          'imagen': [],
          'movimientos': [],
          'existe': true,
        },
        nombres: [],
        poke: '',
        loading: false
      }
    },

    computed: {},

    methods: {
      async llamarApiPokemon(pk) {
        this.loading = true;
        if (!pk) {
          this.pokemon['nombre'] = 'INGRESA UN POKÉMON'
          this.pokemon['habilidades'] = ''
          this.pokemon['imagen'] = ''
          this.pokemon['movimientos'] = ''
          this.pokemon['existe'] = false

          this.loading = false;
        } else {
          pk = pk.toLowerCase()
          try {
            const pokemonApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pk}`)
            const pokemonLlamado = await pokemonApi.json()
            console.log(pokemonLlamado)

            this.pokemon['nombre'] = pokemonLlamado.name
            this.pokemon['habilidades'] = []
            for (let i of pokemonLlamado.abilities) {
              this.pokemon['habilidades'].push(i['ability']['name'])
            }
            this.pokemon['movimientos'] = []
            for (let i of pokemonLlamado.moves) {
              this.pokemon['movimientos'].push(i['move']['name'])
            }
            this.pokemon['imagen'] = pokemonLlamado.sprites.front_default

            this.loading = false;
            this.pokemon['existe'] = true

            console.log(this.pokemon)

          } catch (error) {
            this.pokemon['nombre'] = 'POKÉMON NO EXISTE'
            this.pokemon['habilidades'] = ''
            this.pokemon['imagen'] = ''
            this.pokemon['movimientos'] = ''
            console.warn(error)
            this.poke = ''
            this.loading = false;
            this.pokemon['existe'] = false
          }
        }
      },

      // ***** llamamos a la lista de nombres
      async llamarNombresPokemon() {
        try {
          const nombresApi = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=1&limit=1153`)
          const nombresLlamados = await nombresApi.json()
          const nombresLlamadosResult = nombresLlamados.results
          for (let i of nombresLlamadosResult) {
            console.log(i['name'])
            // this.nombres.push(i['name'])
          }
        } catch (error) {
          console.warn(error)
        }
      }
    },
    created() {
      this.llamarApiPokemon('pikachu')
      this.llamarNombresPokemon()
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#imgPoke {
  max-width: 150px;
  max-height: 150px
}

#imgPoke2 {
  max-width: 50px;
  max-height: 50px
}
</style>
