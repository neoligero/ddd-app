import { Container } from 'inversify';
import { bindToContainer as bindShared } from '@shared/inversify.bindings';
import { bindToContainer as bindUser } from '@modules/users/inversify.bindings';

export const container = new Container();

export const initInversify = () => {
  bindShared(container);
  bindUser(container);
};
