<?php


namespace app\admin\controller;


use think\Controller;
use think\Db;
use think\Request;
use app\admin\model\Categories as CategoriesModel;

class Category extends Controller
{
    public function index(Request $request)
    {
        $clid = $request->get() ? $request->get()['crid'] : null;
        $operation = $clid ? 'update' : 'insert';
        $data = CategoriesModel::name('categories')->where('crid', $clid)->find();
        $this->assign('operation', $operation);
        $this->assign('data', $data);
        return $this->fetch('/category');
    }

    public function handle(Request $request)
    {
        $result = $request->post();
        $CategoriesModel = CategoriesModel::name('categories');

        if ($result["operation"] == "update") {
            $CategoriesModel->where('crid', $result['crid'])->update([
                'name' => $result['name']
            ]);
            return res($result, '修改成功！', 200);
        }
        if ($result['operation'] == "insert") {
            $find = $CategoriesModel->where('name', $result['name'])->find();
            if ($find) {
                return res(null, '分类已存在！', 400);
            }
            $CategoriesModel->insert([
                'name' => $result['name']
            ]);
            return res(null, '添加成功！', 200);
        }

    }

    public function del(Request $request)
    {
      return  del($request, 'categories', 'crid');
    }
}