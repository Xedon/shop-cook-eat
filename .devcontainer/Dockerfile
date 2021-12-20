#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

ARG NONROOT_USER=node

RUN su ${NONROOT_USER} -c "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --profile  -y && bash -c 'source ~/.cargo/env && cargo install diesel_cli --no-default-features --features postgres'"

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends postgresql-client


