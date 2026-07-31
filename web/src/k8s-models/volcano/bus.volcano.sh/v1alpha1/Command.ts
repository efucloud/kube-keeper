import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/BusVolcanoShV1alpha1Command';

/**
 * Command defines command structure.
 */
export interface ICommand {
  /**
   * Action defines the action that will be took to the target object.
   */
  action?: string;
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'bus.volcano.sh/v1alpha1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'Command';
  /**
   * Human-readable message indicating details of this command.
   */
  message?: string;
  metadata?: IObjectMeta;
  /**
   * Unique, one-word, CamelCase reason for this command.
   */
  reason?: string;
  /**
   * TargetObject defines the target object of this command.
   */
  target?: {
    /**
     * API version of the referent.
     */
    apiVersion: string;
    /**
     * If true, AND if the owner has the "foregroundDeletion" finalizer, then
     * the owner cannot be deleted from the key-value store until this
     * reference is removed.
     * See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion
     * for how the garbage collector interacts with this field and enforces the foreground deletion.
     * Defaults to false.
     * To set this field, a user needs "delete" permission of the owner,
     * otherwise 422 (Unprocessable Entity) will be returned.
     */
    blockOwnerDeletion?: boolean;
    /**
     * If true, this reference points to the managing controller.
     */
    controller?: boolean;
    /**
     * Kind of the referent.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    kind: string;
    /**
     * Name of the referent.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
     */
    name: string;
    /**
     * UID of the referent.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids
     */
    uid: string;
  };
}

/**
 * Command defines command structure.
 */
export class Command extends Model<ICommand> implements ICommand {
  action?: ICommand['action'];
  apiVersion: ICommand['apiVersion'];
  kind: ICommand['kind'];
  message?: ICommand['message'];
  metadata?: ICommand['metadata'];
  reason?: ICommand['reason'];
  target?: ICommand['target'];

  static apiVersion: ICommand['apiVersion'] = 'bus.volcano.sh/v1alpha1';
  static kind: ICommand['kind'] = 'Command';
  static is = createTypeMetaGuard<ICommand>(Command);

  constructor(data?: ModelData<ICommand>) {
    super();

    this.setDefinedProps({
      apiVersion: Command.apiVersion,
      kind: Command.kind,
      ...data,
    } as ICommand);
  }
}

setValidateFunc(Command, validate as ValidateFunc<ICommand>);
