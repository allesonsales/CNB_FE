import { Routes } from '@angular/router';
import { TabBarComponent } from './shared/components/tabbar/tabbar.component';
import { HomePage } from './features/home/pages/home/home.page';
import { BicicletasPage } from './features/bicicletas/pages/bicicletas/bicicletas.page';
import { LoginPage } from './features/auth/pages/login/login.page';
import { DetalheBicicletaPage } from './features/bicicletas/pages/detalhe-bicicleta/detalhe-bicicleta.page';
import { AdicionarBicicletaPage } from './features/bicicletas/pages/adicionar-bicicleta/adicionar-bicicleta.page';
import { NotificacoesPage } from './features/social/pages/notificacoes/notificacoes.page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: TabBarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/pages/home/home.page').then(
            (m) => m.HomePage,
          ),
      },
      {
        path: 'bicicletas',
        loadComponent: () =>
          import('./features/bicicletas/pages/bicicletas/bicicletas.page').then(
            (m) => m.BicicletasPage,
          ),
      },
      {
        path: 'notificacoes',
        component: NotificacoesPage,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'adicionar-bicicleta',
        component: AdicionarBicicletaPage,
      },
      {
        path: 'bicicleta/:numeroSerie',
        component: DetalheBicicletaPage,
      },
      {
        path: 'adicionar-bicicleta',
        loadComponent: () =>
          import('./features/bicicletas/pages/adicionar-bicicleta/adicionar-bicicleta.page').then(
            (m) => m.AdicionarBicicletaPage,
          ),
      },
      {
        path: 'user/:id',
        loadComponent: () =>
          import('./features/social/pages/perfil/perfil.page').then(
            (m) => m.PerfilPage,
          ),
      },
    ],
  },

  { path: 'login', component: LoginPage },
  {
    path: 'cadastre-se',
    loadComponent: () =>
      import('./features/auth/pages/cadastre-se/cadastre-se.page').then(
        (m) => m.CadastreSePage,
      ),
  },
  {
    path: 'consulta-publica/:numeroSerie',
    loadComponent: () =>
      import('./features/bicicletas/pages/autenticacao-bicicleta-publica/autenticacao-bicicleta-publica.page').then(
        (m) => m.AutenticacaoBicicletaPublicaPage,
      ),
  },
  {
    path: 'consulta-publica',
    loadComponent: () =>
      import('./features/bicicletas/pages/consulta-publica/consulta-publica.page').then(
        (m) => m.ConsultaPublicaPage,
      ),
  },
  {
    path: 'politica-privacidade',
    loadComponent: () =>
      import('./features/auth/pages/politica-privacidade/politica-privacidade.page').then(
        (m) => m.PoliticaPrivacidadePage,
      ),
  },
];
