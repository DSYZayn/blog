---
title: "Automatically build and deploy my blog"
description: "Use github actions and tailscale to automatically build and deploy my blog on remote server."
published: 2024/07/22
slug: "automatically-build-and-deploy-blog"
---

```yaml
name: 'Deploy'

on:
  push:
    branches:
      - main
    paths-ignore:
      - README.md
      - LICENCE
      - gitignore

  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/chekcout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 18
        - run: npm install -g yarn
        - name: yarn install, build
          run: |
            yarn install
            yarn build
        - name: Tailscale
          uses: tailscale/github-action@v2
          with:
            authkey: $({ secrets.TAILSCALE_AUTHKEY })
        - name: upload file to remote
          uses: wlixcc/SFTP-Deploy-Action@v1.2.4
          with:
            server: $({ secrets.DEPLOY_IP })
            username: $({ secrets.DEPLOY_USER })
            password: $({ secrets.DEPLOY_PASSWORD })
            local_path: './output/*'
            remote_path: '/tmp/website'
            sftp_only: true

        - name: launch remote 
          uses: appleboy/ssh-action@master
          with:
            ip: $({ secrets.DEPLOY_IP })
            username: $({ secrets.DEPLOY_USER })
            password: $({ secrets.DEPLOY_PASSWORD })
            script: |
              cd 
              rm -rf ./website/*
              mv /tmp/website/* ./website/
              rm -rf /tmp/website
              sudo docker restart v18
              exit
```