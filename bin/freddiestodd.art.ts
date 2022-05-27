#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FreddiestoddArtStack } from "../lib/freddiestodd.art-stack";

const app = new cdk.App();
new FreddiestoddArtStack(app, "FreddiestoddArtStack", {
  env: { account: "806124249357", region: "us-east-1" },
});
