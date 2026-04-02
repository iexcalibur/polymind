/**
 * ServersService has been removed. This component now simply passes through children.
 */
export const CurrentServerScopeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export const useCurrentServerService = () => {
  return undefined;
};
