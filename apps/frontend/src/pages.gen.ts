// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse, SearchCodecsForPages } from 'waku/router';

// prettier-ignore
import type { getConfig as File_Root_getConfig } from './pages/_root';
// prettier-ignore
import type { getConfig as File_AdminIndex_getConfig } from './pages/admin/index';
// prettier-ignore
import type { getConfig as File_AuthIndex_getConfig } from './pages/auth/index';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_ShowroomId_getConfig } from './pages/showroom/[id]';
// prettier-ignore
import type { getConfig as File_ShowroomIndex_getConfig } from './pages/showroom/index';
// prettier-ignore
import type { getConfig as File_Sobre_getConfig } from './pages/sobre';

// prettier-ignore
type Page =
| ({ path: '/_root' } & GetConfigResponse<typeof File_Root_getConfig>)
| ({ path: '/admin' } & GetConfigResponse<typeof File_AdminIndex_getConfig>)
| ({ path: '/auth' } & GetConfigResponse<typeof File_AuthIndex_getConfig>)
| { path: '/contato'; render: 'static' }
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/showroom/[id]' } & GetConfigResponse<typeof File_ShowroomId_getConfig>)
| ({ path: '/showroom' } & GetConfigResponse<typeof File_ShowroomIndex_getConfig>)
| ({ path: '/sobre' } & GetConfigResponse<typeof File_Sobre_getConfig>);

// prettier-ignore
type Layout =
| { path: '/' }
| { path: '/admin' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
    layouts: Layout;
  }
  interface SearchCodecsConfig extends SearchCodecsForPages<Page> {}
}
