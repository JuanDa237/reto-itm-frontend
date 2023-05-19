interface WithObjectPathProps {
  value: any;
  row: any;
  path: string;
  defaultValue: any;
}

export const WithObjectPath = (props: WithObjectPathProps) => {
  return props.path
    .split(".")
    .reduce((o: any, p: any) => (o ? o[p] : props.defaultValue), props.value);
};
