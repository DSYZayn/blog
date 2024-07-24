export type item = {
  title: string;
  link: string;
  active: boolean;
  child: Ref<item>[];
};