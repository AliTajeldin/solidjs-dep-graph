// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>dagre-solidjs</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-slate-800">
        <Suspense>
          <ErrorBoundary>
            <div class="mb-1">
              <a class="rounded-full bg-indigo-500 hover:bg-indigo-800 px-2 py-1 text-xs font-bold mr-2" href="/">
                Basic
              </a>
              <a class="rounded-full bg-indigo-500 hover:bg-indigo-800 px-2 py-1 text-xs font-bold mr-2" href="/custom">
                Custom
              </a>
            </div>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
