<!-- git文档 -->
## 1. gitlab 仓库迁移
用户所有分支及主干都有操作权限
1. 克隆老项目的镜像
git clone --mirror old.git(old.git为老项目的git地址)

2. 进入项目目录
cd old.git

3. 老项目的地址替换成新项目的地址
git remote set-url origin new.git(new.git为新项目的git地址)

4. 将镜像推到远程
git push --mirror new.git(new.git为新项目的git地址)
