import 'package:flutter/material.dart';
import 'package:pokemon_lets_go_flutter/presentation/pages/pokemon/pokemon_bloc.dart';

import '../../../domain/pokemon_item_list_model.dart';

class PokemonPage extends StatefulWidget {
  final PokemonItemListModel pokemonItemListModel;

  PokemonPage({@required this.pokemonItemListModel});

  @override
  _PokemonPageState createState() => _PokemonPageState(pokemonItemListModel);
}

class _PokemonPageState extends State<PokemonPage> {
  PokemonBloc _pokemonBloc;

  _PokemonPageState(PokemonItemListModel pokemon) {
    _pokemonBloc = PokemonBloc(pokemon);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_pokemonBloc.pokemonNameDisplay),
      ),
      body: Container(
        child: Center(
          child: Image.network(_pokemonBloc.pokemon.spriteUrl),
        ),
      ),
    );
  }
}
