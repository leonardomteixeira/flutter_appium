import '../../../core/base_bloc.dart';
import '../../../domain/pokemon_item_list_model.dart';

class PokemonBloc extends BaseBloc {
  PokemonItemListModel pokemon;

  PokemonBloc(this.pokemon);

  String get pokemonNameDisplay => pokemon.nameDisplay;
}
