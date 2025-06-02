<?php
namespace App\Enums;

enum ProductTypeEnum : string {
    case DELIVERABLE = 'deliverable';
    case DOWNLOADABLE = 'downloadable';
}
//is_ebook & is_not_ebook
enum ProductEBookEnum : string {
    case IS_EBOOK = 'eBook';
    case IS_NOT_EBOOK = 'Not an eBook';
}
//binding, paperback, hardcover
enum ProductBindingEnum : string {
    case BINDING = 'binding';
    case PAPERBACK = 'paperback';
    case HARDCOVER = 'hardcover';
}
