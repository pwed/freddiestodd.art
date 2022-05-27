import { aws_cloudfront, aws_route53, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";
import { StaticSite } from "pwed-cdk/lib/lib/static-site";
import { minify } from "html-minifier";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FreddiestoddArtStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const index = minify(
      readFileSync(
        join(__dirname, "..", "freddiestodd.art", "index.html")
      ).toString(),
      {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        minifyURLs: true,
        removeEmptyAttributes: true,
        removeEmptyElements: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
      }
    );

    mkdirSync(join(__dirname, "..", "public"), { recursive: true });

    writeFileSync(join(__dirname, "..", "public", "index.html"), index);

    new StaticSite(this, "FreddiestoddArt", {
      domain: "freddiestodd.art",
      hostedZone: aws_route53.HostedZone.fromLookup(this, "zone", {
        domainName: "freddiestodd.art",
      }),
      path: join(__dirname, "..", "public"),
    });
  }
}
