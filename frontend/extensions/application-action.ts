/* Copyright Contributors to the Open Cluster Management project */
import { Extension, ExtensionDeclaration, CodeRef } from '@openshift-console/dynamic-plugin-sdk/lib/types';

export type ApplicationActionProps = ExtensionDeclaration<
  'acm.application/action',
  {
    /** Label for the create prop action. */
    label: string;
    component: CodeRef<() => void>;
  }
>;

// Type guards

export const isApplicationActionProps = (e: Extension): e is ApplicationActionProps =>
  e.type === 'acm.application/action';
