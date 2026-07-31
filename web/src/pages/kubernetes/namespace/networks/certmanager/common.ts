import type { IntlShape } from 'react-intl';

const EMPTY_VALUE = '-';

type ResourceCondition = {
  type?: string;
  status?: string;
  reason?: string;
  message?: string;
};

export const formatDisplayValue = (
  value?: string | number | null,
): string => {
  if (value === undefined || value === null) {
    return EMPTY_VALUE;
  }
  const nextValue = `${value}`.trim();
  return nextValue === '' ? EMPTY_VALUE : nextValue;
};

export const formatBooleanValue = (
  intl: IntlShape,
  value?: boolean | null,
): string => {
  if (value === undefined || value === null) {
    return EMPTY_VALUE;
  }
  return value
    ? intl.formatMessage({ id: 'cluster.resource.certmanager.common.true' })
    : intl.formatMessage({ id: 'cluster.resource.certmanager.common.false' });
};

export const formatCompactList = (
  items: Array<string | null | undefined>,
  maxVisible = 2,
): string => {
  const validItems = items
    .map((item) => item?.trim())
    .filter((item): item is string => !!item);
  if (validItems.length === 0) {
    return EMPTY_VALUE;
  }
  if (validItems.length <= maxVisible) {
    return validItems.join(', ');
  }
  return `${validItems.slice(0, maxVisible).join(', ')} +${
    validItems.length - maxVisible
  }`;
};

export const getConditionByType = (
  resource: any,
  type: string,
): ResourceCondition | undefined => {
  return resource?.status?.conditions?.find(
    (condition: ResourceCondition) => condition?.type === type,
  );
};

export const formatConditionStatus = (
  intl: IntlShape,
  condition?: ResourceCondition,
): string => {
  if (!condition?.status) {
    return EMPTY_VALUE;
  }
  return intl.formatMessage({
    id: `cluster.resource.certmanager.condition.status.${condition.status.toLowerCase()}`,
    defaultMessage: condition.status,
  });
};

export const formatConditionReasonMessage = (
  condition?: ResourceCondition,
): string => {
  if (!condition) {
    return EMPTY_VALUE;
  }
  const reason = condition.reason?.trim();
  const message = condition.message?.trim();
  if (reason && message) {
    return `${reason}: ${message}`;
  }
  return reason || message || EMPTY_VALUE;
};

export const formatCertManagerState = (
  intl: IntlShape,
  state?: string,
): string => {
  if (!state) {
    return EMPTY_VALUE;
  }
  return intl.formatMessage({
    id: `cluster.resource.certmanager.state.${state.toLowerCase()}`,
    defaultMessage: state,
  });
};

export const formatIssuerRef = (resource: any): string => {
  const issuerRef = resource?.spec?.issuerRef;
  if (!issuerRef?.name) {
    return EMPTY_VALUE;
  }
  const issuerKind = issuerRef.kind || 'Issuer';
  return `${issuerKind}/${issuerRef.name}`;
};

export const getIssuerType = (issuer: any): string => {
  if (issuer?.spec?.acme) return 'acme';
  if (issuer?.spec?.ca) return 'ca';
  if (issuer?.spec?.selfSigned) return 'selfsigned';
  if (issuer?.spec?.vault) return 'vault';
  if (issuer?.spec?.venafi) return 'venafi';
  return '';
};

export const formatIssuerType = (
  intl: IntlShape,
  issuerType: string,
): string => {
  if (!issuerType) {
    return EMPTY_VALUE;
  }
  return intl.formatMessage({
    id: `cluster.resource.certmanager.issuer.type.${issuerType}`,
    defaultMessage: issuerType.toUpperCase(),
  });
};

export const getIssuerEndpoint = (issuer: any): string => {
  return formatDisplayValue(
    issuer?.spec?.acme?.server ||
      issuer?.spec?.vault?.server ||
      issuer?.spec?.venafi?.tpp?.url ||
      issuer?.spec?.venafi?.cloud?.url,
  );
};
