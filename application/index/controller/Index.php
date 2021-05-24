<?php
namespace app\index\controller;

use app\admin\model\Article as ArticleModel;
use app\admin\model\Comments as CommentsModel;
use app\admin\model\SlideShow as SlideShowModel;
use think\Controller;
use app\admin\model\Categories as CategoriesModel;
use think\facade\Env;
use think\Request;

include Env::get('config_path').'TemplateConfig.php';

class Index extends Controller
{
    public function index(Request $request)
    {
        // 最新文章
        // 获取最新文章
        $PaginateModel = ArticleModel::name('article')->paginate(10);
        $totalPage = ceil($PaginateModel->total() / 10);
        $data = $request->get();
        $size = array_key_exists('size',$data) ?  $data['size'] : 10;
        $page = array_key_exists('page',$data) ?  $data['page'] : 1;
        $article  =  ArticleModel::name('article')->where('state',true)->order("aid desc" )->limit(($page -1) * $size ,$size)->select();
        $Data = [];
        for ($i=0;$i< count((array)$article);$i++) {
            $CategoriesModel = CategoriesModel::name('categories')->where('crid',$article[$i]['crid'])->find();
            $comments_total = CommentsModel::name('comments')->where('aid',$article[$i]['aid'])->count();

            $obj = [
                'aid'           =>  $article[$i]['aid'],
                'title'         =>  $article[$i]['title'],
                'release_date'  =>  $article[$i]['release_date'],
                'content'       =>  $article[$i]['content'],
                'crid'          =>  $article[$i]['crid'],
                'label'         =>  $article[$i]['label'],
                'browse'        =>  $article[$i]['browse'],
                'praise'        =>  $article[$i]['praise'],
                'top'           =>  $article[$i]['top'],
                'recommended'   =>  $article[$i]['recommended'],
                'status'        =>  $article[$i]['state'],
                'Categories'    =>  $CategoriesModel,
                'comments_total'=>  $comments_total,
                'cover'         =>  $article[$i]['cover']
            ];
            array_push($Data,$obj);
        }
        // 获取轮播图
        $slide_show = SlideShowModel::name('slide_show')->order('numerical desc')->select();
        $this->assign([
           'articleList'    =>  $Data,
            'totalPage'     =>  $totalPage,
            'page'          =>  $page,
            'slide_show'    =>  $slide_show
        ]);
        return $this->fetch(TMPL_PATH.'/index');
    }
   }
