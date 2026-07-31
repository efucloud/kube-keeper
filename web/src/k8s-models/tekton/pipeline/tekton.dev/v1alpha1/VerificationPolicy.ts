import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TektonDevV1alpha1VerificationPolicy';

/**
 * VerificationPolicy defines the rules to verify Tekton resources.
 * VerificationPolicy can config the mapping from resources to a list of public
 * keys, so when verifying the resources we can use the corresponding public keys.
 */
export interface IVerificationPolicy {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'tekton.dev/v1alpha1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'VerificationPolicy';
  metadata?: IObjectMeta;
  /**
   * Spec holds the desired state of the VerificationPolicy.
   */
  spec: {
    /**
     * Authorities defines the rules for validating signatures.
     */
    authorities: Array<{
      /**
       * Key contains the public key to validate the resource.
       */
      key?: {
        /**
         * Data contains the inline public key.
         */
        data?: string;
        /**
         * HashAlgorithm always defaults to sha256 if the algorithm hasn't been explicitly set
         */
        hashAlgorithm?: string;
        /**
         * KMS contains the KMS url of the public key
         * Supported formats differ based on the KMS system used.
         * One example of a KMS url could be:
         * gcpkms://projects/[PROJECT]/locations/[LOCATION]>/keyRings/[KEYRING]/cryptoKeys/[KEY]/cryptoKeyVersions/[KEY_VERSION]
         * For more examples please refer https://docs.sigstore.dev/cosign/kms_support.
         * Note that the KMS is not supported yet.
         */
        kms?: string;
        /**
         * SecretRef sets a reference to a secret with the key.
         */
        secretRef?: {
          /**
           * name is unique within a namespace to reference a secret resource.
           */
          name?: string;
          /**
           * namespace defines the space within which the secret name must be unique.
           */
          namespace?: string;
        };
      };
      /**
       * Name is the name for this authority.
       */
      name: string;
    }>;
    /**
     * Mode controls whether a failing policy will fail the taskrun/pipelinerun, or only log the warnings
     * enforce - fail the taskrun/pipelinerun if verification fails (default)
     * warn - don't fail the taskrun/pipelinerun if verification fails but log warnings
     */
    mode?: string;
    /**
     * Resources defines the patterns of resources sources that should be subject to this policy.
     * For example, we may want to apply this Policy from a certain GitHub repo.
     * Then the ResourcesPattern should be valid regex. E.g. If using gitresolver, and we want to config keys from a certain git repo.
     * `ResourcesPattern` can be `https://github.com/tektoncd/catalog.git`, we will use regex to filter out those resources.
     */
    resources: Array<{
      /**
       * Pattern defines a resource pattern. Regex is created to filter resources based on `Pattern`
       * Example patterns:
       * GitHub resource: https://github.com/tektoncd/catalog.git, https://github.com/tektoncd/\*
       * Bundle resource: gcr.io/tekton-releases/catalog/upstream/git-clone, gcr.io/tekton-releases/catalog/upstream/\*
       * Hub resource: https://artifacthub.io/\*,
       */
      pattern: string;
    }>;
  };
}

/**
 * VerificationPolicy defines the rules to verify Tekton resources.
 * VerificationPolicy can config the mapping from resources to a list of public
 * keys, so when verifying the resources we can use the corresponding public keys.
 */
export class VerificationPolicy
  extends Model<IVerificationPolicy>
  implements IVerificationPolicy
{
  apiVersion: IVerificationPolicy['apiVersion'];
  kind: IVerificationPolicy['kind'];
  metadata?: IVerificationPolicy['metadata'];
  spec: IVerificationPolicy['spec'];

  static apiVersion: IVerificationPolicy['apiVersion'] = 'tekton.dev/v1alpha1';
  static kind: IVerificationPolicy['kind'] = 'VerificationPolicy';
  static is = createTypeMetaGuard<IVerificationPolicy>(VerificationPolicy);

  constructor(data?: ModelData<IVerificationPolicy>) {
    super();

    this.setDefinedProps({
      apiVersion: VerificationPolicy.apiVersion,
      kind: VerificationPolicy.kind,
      ...data,
    } as IVerificationPolicy);
  }
}

setValidateFunc(
  VerificationPolicy,
  validate as ValidateFunc<IVerificationPolicy>,
);
