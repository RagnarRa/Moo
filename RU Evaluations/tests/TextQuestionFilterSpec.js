describe('TextQuestionFilter', function () {
    'use strict';
    var $filter, arr;

    beforeEach(function () {
        module("evaluationApp");

        inject(function (_$filter_) {
            $filter = _$filter_;
        });

        arr = [
            {Head: 'item 1', Type: 'text'},
            {Head: 'item 2', Type: 'multiple'},
            {Head: 'item 3', Type: 'multiple'},
            {Head: 'item 4', Type: 'single'},
            {Head: 'item 5', Type: 'multiple'},
            {Head: 'item 6', Type: 'text'}
        ];

    });

    it('should have two elements', function () {

        var result;

        result = $filter('TextQuestionFilter')(arr);
        expect(result.length).toEqual(2);
        expect(result[0].Head).toEqual('item 1');
        expect(result[0].Type).toEqual('text');
        expect(result[1].Head).toEqual('item 6');
        expect(result[1].Type).toEqual('text');
    });
});