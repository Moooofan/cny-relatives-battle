import type { Boss } from "@/content/types";
import xiaoBiaodi from "./xiao-biaodi";
import neighborChen from "./neighbor-chen";
import biaojie from "./biaojie";
import dabo from "./dabo";
import guzhang from "./guzhang";
import sanjiuma from "./sanjiuma";
import ama from "./ama";
import sangu from "./sangu";

export const BOSSES: Boss[] = [
  xiaoBiaodi,
  neighborChen,
  biaojie,
  dabo,
  guzhang,
  sanjiuma,
  ama,
  sangu,
].sort((a, b) => a.order - b.order);
