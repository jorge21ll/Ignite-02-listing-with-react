import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import './styles/sidebar.scss';
import './styles/content.scss';
import './styles/global.scss';
import { MoviesProvider } from './GeneralSupplier';


export function App() {
  return (
    <MoviesProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </MoviesProvider>


  )
}