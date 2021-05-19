import { Button } from '../components/Button';
import { useMovies } from '../GeneralSupplier';

export function SideBar() {
  // Complete aqui
  const { genres, handleClickButton, selectedGenreId } = useMovies()
  console.log(genres)
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}