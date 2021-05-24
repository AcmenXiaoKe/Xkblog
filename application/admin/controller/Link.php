<?php


namespace app\admin\controller;


use think\Controller;
use think\Request;
use app\admin\model\Link as LinkModel;

class Link extends Controller
{
    public function index(Request $request)
    {
        $id = $request->get() ? $request->get()['id'] : null;
        $operation = $id ? 'update' : 'insert';
        $data = LinkModel::name('link')->where('id', $id)->find();
        $this->assign('operation', $operation);
        $this->assign('data', $data);
        return $this->fetch('/link');
    }
    public function handle(Request $request){
        $result = $request->post();
        $LinkModel = LinkModel::name('link');
        $Data = [
          'numerical'       =>     $result['numerical'],
          'name'            =>     $result['name'],
          'email'           =>     $result['email'],
          'url'             =>     $result['url'],
          'description'     =>     $result['description'],
          'icon'            =>     $result['icon']
        ];
        if ($result["operation"] == "update") {
            $LinkModel->where('id', $result['id'])->update($Data);
            return res($result, '修改成功！', 200);
        }
        if ($result['operation'] == "insert") {
            $Data = [
                'numerical'       =>     $result['numerical'],
                'name'            =>     $result['name'],
                'email'           =>     $result['email'],
                'url'             =>     $result['url'],
                'description'     =>     $result['description'],
                'icon'            =>     $result['icon'],
                'state'           =>     true
            ];
            $find = $LinkModel->where('url', $result['url'])->find();
            if ($find) {
                return res(null, '友联已存在！', 400);
            }
            $LinkModel->insert($Data);
            return res(null, '添加成功！', 200);
        }
    }
}