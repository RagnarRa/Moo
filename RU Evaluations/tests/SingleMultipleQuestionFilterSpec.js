describe('SingleMultipleQuestionFilter', function () {
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
            {Head: 'item 3', Type: 'single'},
            {Head: 'item 4', Type: 'multiple'},
            {Head: 'item 5', Type: 'text'}
        ];

    });

    it('should have two elements', function () {

        var result;

        result = $filter('SingleMultipleQuestionFilter')(arr);
        expect(result.length).toEqual(3);
        expect(result[0].Head).toEqual('item 2');
        expect(result[0].Type).toEqual('multiple');
        expect(result[1].Head).toEqual('item 3');
        expect(result[1].Type).toEqual('single');
        expect(result[2].Head).toEqual('item 4');
        expect(result[2].Type).toEqual('multiple');
    });
});