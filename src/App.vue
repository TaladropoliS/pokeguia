<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->

    <div class="col-10 col-md-6 mx-auto mb-5">
      <div class="card p-3 col-6 mx-auto">
        <input type="text" v-model="poke" class="form-control"
               placeholder="Por ejemplo PIKACHU"/>
        <button class="btn btn-primary btn-sm"
                @click="llamarApiPokemon(poke)">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div class="row justify-content-center">
        <div class="card col-3 d-flex h6 my-auto mb-1">
          {{ nombre }}
        </div>
      </div>

      <div class="card p-3">
        <h3 v-if="pokemon['nombre'] === 'POKEMON NO EXISTE'"
            class="text-uppercase fw-bold text-danger">
            {{ pokemon['nombre'] }}
        </h3>
        <h3 v-else class="text-uppercase fw-bold">{{ pokemon['nombre'] }}</h3>

        <img v-if="pokemon['imagen']!= null"
             id="imgPoke" :src="pokemon['imagen']" alt=""
             class="img-fluid card-img-top mx-auto" width="auto" height="auto">
        <img v-else id="imgPoke2" src="https://cdn-icons-png.flaticon.com/512/25/25400.png"
             alt=""
             class="img-fluid card-img-top mx-auto" width="auto" height="auto">
        <br>

        <h5 class="text-center fw-bold">Habilidades</h5>
        <div class="row justify-content-center">
          <div class="card col-3 d-flex h6 my-auto mb-1"
               v-for="(hab, index) in pokemon['habilidades']">{{ hab }}
          </div>
        </div>

        <br>
        <h5 class="text-center fw-bold">Movimientos</h5>
        <div class="row justify-content-center">
          <div class="card col-3 d-flex h6 my-auto mb-1"
               v-for="(peli, index) in pokemon['movimientos']">{{ peli }}
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
        },
        nombres: [],
        // nombre: '',
        poke: ''
      }
    },

    computed: {
      nombre: function () {
        if (this.poke.length > 1) {
          console.log(this.poke)
          return this.poke
        }
      }
    },

    methods: {
      async llamarApiPokemon(pk) {
        if (!pk) {
          this.pokemon['nombre'] = 'ESE POKEMON NO EXISTE'
          this.pokemon['habilidades'] = ''
          this.pokemon['imagen'] = ''
          this.pokemon['movimientos'] = ''
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
          } catch (error) {
            this.pokemon['nombre'] = 'POKEMON NO EXISTE'
            this.pokemon['habilidades'] = ''
            this.pokemon['imagen'] = ''
            this.pokemon['https://pokeapi.co/api/v2/move/5/'] = ''
            console.warn(error)
            this.poke = ''
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
            this.nombres.push(i['name'])
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
