<?php


namespace app\index\controller;


use app\admin\model\Categories as CategoriesModel;
use app\admin\model\Comments as CommentsModel;
use think\Controller;
use think\Request;
use app\admin\model\Article as ArticleModel;

class Search extends Controller
{
    public function index($val){
      $data = ArticleModel::name('article')->where('state',true)->where('content','like',('%'.$val.'%'))->select();
      $Data = [];
       for ($i=0;$i< count((array)$data);$i++) {
            $Categories = CategoriesModel::name('categories')->where('crid',$data[$i]['crid'])->find();
            $comments_total = CommentsModel::name('comments')->where('aid',$data[$i]['aid'])->count();
            $obj = [
                'aid'           =>  $data[$i]['aid'],
                'title'         =>  $data[$i]['title'],
                'release_date'  =>  $data[$i]['release_date'],
                'content'       =>  $data[$i]['content'],
                'crid'          =>  $data[$i]['crid'],
                'label'         =>  $data[$i]['label'],
                'browse'        =>  $data[$i]['browse'],
                'praise'        =>  $data[$i]['praise'],
                'top'           =>  $data[$i]['top'],
                'recommended'   =>  $data[$i]['recommended'],
                'status'        =>  $data[$i]['state'],
                'categories'    =>  $Categories,
                'comments_total'=>  $comments_total,
                'cover'         =>  $data[$i]['cover']
            ];
            array_push($Data,$obj);
        }
      $this->assign([
          'data'        =>      $Data,
          'val'         =>      $val,
          'data_total'   =>  count((array)$data)
      ]);
//       return  json($Data);
      return  $this->fetch(TMPL_PATH.'/search');
    }
    public function category($id){
        $Categories_data = CategoriesModel::name('categories')->where('crid',$id)->find();
        $data = ArticleModel::name('article')->where('state',true)->where('crid',$id)->select();
        $Data = [];
        for ($i=0;$i< count((array)$data);$i++) {
            $Categories = CategoriesModel::name('categories')->where('crid',$data[$i]['crid'])->find();
            $comments_total = CommentsModel::name('comments')->where('aid',$data[$i]['aid'])->count();
            $obj = [
                'aid'           =>  $data[$i]['aid'],
                'title'         =>  $data[$i]['title'],
                'release_date'  =>  $data[$i]['release_date'],
                'content'       =>  $data[$i]['content'],
                'crid'          =>  $data[$i]['crid'],
                'label'         =>  $data[$i]['label'],
                'browse'        =>  $data[$i]['browse'],
                'praise'        =>  $data[$i]['praise'],
                'top'           =>  $data[$i]['top'],
                'recommended'   =>  $data[$i]['recommended'],
                'status'        =>  $data[$i]['state'],
                'categories'    =>  $Categories,
                'comments_total'=>  $comments_total,
                'cover'         =>  $data[$i]['cover']
            ];
            array_push($Data,$obj);
        }
        $this->assign([
            'data'        =>      $Data,
            'val'         =>      $Categories_data['name'],
            'data_total'   =>  count((array)$data)
        ]);
//       return  json($Data);
        return  $this->fetch(TMPL_PATH.'/search');
    }
    public function tag($val){
        $Categories_data = CategoriesModel::name('label')->where('name',$val)->find();
        $data = ArticleModel::name('article')->where('state',true)->where('label','like',('%'.$val.'%'))->select();
        $Data = [];
        for ($i=0;$i< count((array)$data);$i++) {
            $Categories = CategoriesModel::name('categories')->where('crid',$data[$i]['crid'])->find();
            $comments_total = CommentsModel::name('comments')->where('aid',$data[$i]['aid'])->count();
            $obj = [
                'aid'           =>  $data[$i]['aid'],
                'title'         =>  $data[$i]['title'],
                'release_date'  =>  $data[$i]['release_date'],
                'content'       =>  $data[$i]['content'],
                'crid'          =>  $data[$i]['crid'],
                'label'         =>  $data[$i]['label'],
                'browse'        =>  $data[$i]['browse'],
                'praise'        =>  $data[$i]['praise'],
                'top'           =>  $data[$i]['top'],
                'recommended'   =>  $data[$i]['recommended'],
                'status'        =>  $data[$i]['state'],
                'categories'    =>  $Categories,
                'comments_total'=>  $comments_total,
                'cover'         =>  $data[$i]['cover']
            ];
            array_push($Data,$obj);
        }
        $this->assign([
            'data'        =>      $Data,
            'val'         =>      $Categories_data['name'],
            'data_total'   =>  count((array)$data)
        ]);
//       return  json($Data);
        return  $this->fetch(TMPL_PATH.'/search');
    }
}