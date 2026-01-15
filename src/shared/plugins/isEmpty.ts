import { isEmptyValue } from '@/shared/helpers/data-process';
import type { PluginContext } from '../types/plugin';


export default ({ pluginContext, app }: PluginContext) => {
  app.config.globalProperties.$isEmpty = isEmptyValue;
  pluginContext.$isEmpty = app.config.globalProperties.$isEmpty;
};