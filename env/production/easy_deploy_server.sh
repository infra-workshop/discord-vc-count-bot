#!/bin/bash -x

# 簡易Dockerコンテナ立ち上げhttpサーバ。
#
# dockerhubにて「docker imageがビルドされた」際、WebHookの受け先として立ち上げておく簡易HTTPサーバスクリプト。
# 参考 : https://docs.docker.com/docker-hub/webhooks/
#
# 前提条件
#   必要とするコマンド : docker, nc, jq, grep, echo
#
# Ueage
#  起動
#    ./easy_deploy_erver.sh [DISCORDのAPP KEY]
#  WebHookに仕込むURL
#    http://[server]:8989

PORT=8989
DOCKER_CONTAINER_NAME=discord_count_bot
DISCORD_APP_KEY=${1}

while true ; do
  webhook_data_json_file=./docker_`date '+%Y%m%d%H%M%S'`.json
  ( echo "HTTP/1.0 200 Ok"; echo; echo "Accepted docker build finshed." ) | nc -l ${PORT} | grep '^{' > ${webhook_data_json_file}
  image_name=` jq -r '.repository.repo_name' ${webhook_data_json_file}`
  version=` jq -r '.push_data.tag' ${webhook_data_json_file}`
  docker rm -f ${DOCKER_CONTAINER_NAME}
  docker run -d --name ${DOCKER_CONTAINER_NAME} -e DISCORD_APP_KEY=${DISCORD_APP_KEY} -t ${image_name}:${version}
done
